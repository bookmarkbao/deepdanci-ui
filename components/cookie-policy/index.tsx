"use client"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import React from "react"
const metadata: Metadata = {
    title: "Cookie政策 | 图舌单词",
    description: "了解我们如何使用Cookie和类似技术",
}

export function CookiePolicyPage() {
    return (
        <div className="mx-auto container max-w-3xl py-12 pt-4">
            <Link href="/" className="flex gap-2 mb-4 items-center hover:text-[#ff5500]">
                <ArrowLeft className="w-4 h-4" />返回
            </Link>
            <h1 className="mb-6 text-3xl font-bold  text-center">Cookie政策</h1>
            <div className="space-y-6 text-muted-foreground">
                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">什么是Cookie</h2>
                    <p>
                        Cookie是小型文本文件，当您访问网站时，网站可能会将这些文件放置在您的设备上。它们被广泛用于使网站运行或更有效地运行，并提供网站所有者信息。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">我们如何使用Cookie</h2>
                    <p>
                        贵州向宇科技有限公司（以下简称"我们"）使用Cookie和类似技术出于以下目的：
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>
                            <span className="font-medium">必要性Cookie：</span>
                            这些Cookie对于网站的正常运行是必不可少的，不能在我们的系统中关闭。它们通常只是为了响应您所做的操作而设置，例如设置您的隐私偏好、登录或填写表格。
                        </li>
                        <li>
                            <span className="font-medium">功能性Cookie：</span>
                            这些Cookie使我们能够为您提供增强的功能和个性化设置。它们可能由我们或我们放置在页面上的第三方提供商设置。
                        </li>
                        <li>
                            <span className="font-medium">分析Cookie：</span>
                            这些Cookie使我们能够统计访问量和流量来源，以便我们可以衡量和改进我们网站的性能。它们帮助我们了解哪些页面最受欢迎和最不受欢迎，以及访问者如何在网站上移动。
                        </li>
                        <li>
                            <span className="font-medium">广告Cookie：</span>
                            这些Cookie可能由我们的广告合作伙伴通过我们的网站设置。它们可能被这些公司用来建立您的兴趣档案，并在其他网站上向您展示相关广告。
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">我们使用的Cookie</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium">必要性Cookie</h3>
                            <ul className="ml-6 list-disc">
                                <li>会话Cookie - 用于维护用户登录状态</li>
                                <li>CSRF令牌Cookie - 用于防止跨站请求伪造攻击</li>
                                <li>用户偏好Cookie - 存储基本的用户界面偏好设置</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium">功能性Cookie</h3>
                            <ul className="ml-6 list-disc">
                                <li>语言偏好Cookie - 记住您的语言选择</li>
                                <li>主题偏好Cookie - 记住您的显示偏好（如暗模式）</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium">分析Cookie</h3>
                            <ul className="ml-6 list-disc">
                                <li>Google Analytics - 用于分析网站使用情况和性能</li>
                                <li>热图追踪 - 了解用户如何与页面交互</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-medium">广告Cookie</h3>
                            <ul className="ml-6 list-disc">
                                <li>第三方广告Cookie - 用于提供个性化广告</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">控制Cookie</h2>
                    <p>
                        大多数网络浏览器自动接受Cookie，但您通常可以修改浏览器设置以拒绝Cookie。您可以通过更改浏览器设置来删除或阻止Cookie。请注意，如果您选择拒绝Cookie，您可能无法使用我们网站的某些功能。
                    </p>
                    <p className="mt-2">
                        以下链接提供了有关如何在不同浏览器中控制Cookie的信息：
                    </p>
                    <ul className="ml-6 list-disc space-y-1 mt-2">
                        <li>
                            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:underline">
                                Google Chrome
                            </a>
                        </li>
                        <li>
                            <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:underline">
                                Mozilla Firefox
                            </a>
                        </li>
                        <li>
                            <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:underline">
                                Safari
                            </a>
                        </li>
                        <li>
                            <a href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:underline">
                                Internet Explorer
                            </a>
                        </li>
                        <li>
                            <a href="https://support.microsoft.com/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer" className="text-[#ff6600] hover:underline">
                                Microsoft Edge
                            </a>
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">第三方Cookie</h2>
                    <p>
                        除了我们直接设置的Cookie外，我们的网站上的第三方服务可能也会设置Cookie。这些可能包括分析服务（如Google Analytics）、社交媒体平台（如Facebook、Twitter）和广告网络。这些第三方Cookie受这些第三方各自的隐私政策管辖，而不是本政策。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">政策更新</h2>
                    <p>
                        我们可能会不时更新本Cookie政策以反映我们做法的变化或出于其他运营、法律或监管原因。请定期查看本政策，了解我们Cookie做法的最新信息。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">联系我们</h2>
                    <p>
                        如果您对我们的Cookie政策有任何疑问，请联系我们：
                        <a href="mailto:support@tsdanci.com" className="ml-1 text-[#ff6600] hover:underline">
                            support@tsdanci.com
                        </a>
                    </p>
                </section>

                <p className="text-sm">最后更新日期：{new Date().toISOString().split('T')[0]}</p>
            </div>
        </div>
    )
} 