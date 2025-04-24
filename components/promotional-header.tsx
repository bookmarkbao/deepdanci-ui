"use client"
import { useState, useEffect } from "react"
import { X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { supabaseDev } from "@/lib/supabase"

type Announcement = {
    id: string
    title: string
    content: string
    icon: string | null  // 这里存储的直接是emoji  
    link_url: string | null
    button_text: string | null
    image_url: string | null
    priority: number
}

export default function PromotionalHeader() {
    const [isVisible, setIsVisible] = useState(true)
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchAnnouncements = async () => {
            const { data, error } = await supabaseDev
                .from('deep_announcements')
                .select('*')
                .eq('active', true)
                .order('priority', { ascending: false })

            if (data && !error) {
                setAnnouncements(data)
            }
        }

        fetchAnnouncements()
    }, [])

    // 如果有多条公告，设置轮播  
    useEffect(() => {
        if (announcements.length <= 1 || isModalOpen) return

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % announcements.length)
        }, 6000) // 6秒一换，给用户足够的阅读时间  

        return () => clearInterval(interval)
    }, [announcements.length, isModalOpen])

    if (!isVisible || announcements.length === 0) return null

    const currentAnnouncement = announcements[currentIndex]

    // 处理按钮点击 - 如果有图片则打开模态框，否则跳转链接  
    const handleButtonClick = () => {
        if (currentAnnouncement.image_url) {
            setIsModalOpen(true)
        } else if (currentAnnouncement.link_url) {
            window.open(currentAnnouncement.link_url, '_blank')
        }
    }

    // 处理内容点击  
    const handleContentClick = () => {
        if (currentAnnouncement.link_url) {
            window.open(currentAnnouncement.link_url, '_blank')
        }
    }

    return (
        <div className="relative bg-gradient-to-r from-orange-50 via-white to-orange-50 border-b border-orange-100">
            <div className="mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
                {/* Left side with emoji and animated content */}
                <div className="flex items-center space-x-3 overflow-hidden flex-grow">
                    <div className="flex h-9 w-9 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 items-center justify-center shadow-sm flex-shrink-0">
                        <span className="text-lg" aria-hidden="true">
                            {currentAnnouncement.icon || "📣"}
                        </span>
                    </div>

                    <div className="h-[24px] overflow-hidden flex-grow">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentAnnouncement.id}
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -30, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.4
                                }}
                                className={currentAnnouncement.link_url ? "cursor-pointer group" : ""}
                                onClick={handleContentClick}
                            >
                                <p className="font-medium truncate">
                                    <span className="text-[#FF6600] font-bold">{currentAnnouncement.title}</span>
                                    <span className="mx-1.5 text-gray-400">|</span>
                                    <span className="text-gray-700">{currentAnnouncement.content}</span>
                                    {currentAnnouncement.link_url && (
                                        <ExternalLink className="inline-block ml-1 h-3 w-3 text-gray-400 group-hover:text-[#FF6600] transition-colors" />
                                    )}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right side with CTA */}
                <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                    {currentAnnouncement.button_text && (
                        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                            <Button
                                className="inline-flex items-center rounded-md bg-[#FF6600]/80 px-3.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-[#FF5500] transition-colors"
                                onClick={handleButtonClick}
                            >
                                {currentAnnouncement.button_text}
                            </Button>

                            {currentAnnouncement.image_url && (
                                <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden">
                                    <div className="flex flex-col items-center justify-center p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{currentAnnouncement.title}</h3>
                                        <div className="relative w-72 h-72 bg-gradient-to-br p-4 rounded-lg shadow-inner">
                                            <Image
                                                src={currentAnnouncement.image_url}
                                                alt={currentAnnouncement.title}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <p className="mt-5 text-center text-gray-600">
                                            {currentAnnouncement.content}
                                        </p>
                                    </div>
                                </DialogContent>
                            )}
                        </Dialog>
                    )}
                    {/* <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:bg-orange-100 hover:text-gray-600 rounded-full"
                        onClick={() => setIsVisible(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">关闭</span>
                    </Button> */}
                </div>
            </div>

            {/* Brand color accent line */}
            <div className="h-0.5 w-full bg-gradient-to-r from-[#FF6600]/30 via-[#FF6600] to-[#FF6600]/30"></div>

            {/* 如果有多条公告，显示指示器 */}
            {announcements.length > 1 && (
                <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex space-x-1.5 pb-0.5">
                    {announcements.map((_, idx) => (
                        <button
                            key={idx}
                            className={`block h-1.5 w-1.5 rounded-full cursor-pointer transition-all duration-300 ${idx === currentIndex
                                ? 'bg-[#FF6600] scale-110'
                                : 'bg-orange-200 hover:bg-orange-300'
                                }`}
                            onClick={() => setCurrentIndex(idx)}
                            aria-label={`查看公告 ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}