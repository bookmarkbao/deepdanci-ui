import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Twitter, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function SiteFooter() {
    return (
        <footer className="bg-muted/40">
            <div className="px-4 py-5">
                <div className="flex justify-between mx-auto max-w-8xl">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">关于我们</h3>
                        <p className="text-sm text-muted-foreground">我们就像您身边的超级助手，专注于英语和口语，让学习变得轻松又有趣！😎</p>
                        <div className="flex space-x-3">
                            <Link href="https://x.com/gzqxndev" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548" color="currentColor" /></svg>
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="https://space.bilibili.com/440888204?spm_id_from=333.1007.0.0" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="currentColor" fillRule="evenodd" d="M235.516 616.574c16.736-.741 32.287-1.778 47.69-2.074c66.797-1.185 132.409 6.814 194.762 31.998c30.51 12.296 59.984 26.517 86.495 46.516c21.772 16.444 26.512 36.887 16.588 67.108c-6.22 18.665-18.661 32.739-34.36 45.034c-37.028 28.888-75.832 54.96-120.412 69.626c-31.251 10.37-63.687 18.222-96.27 23.259c-42.803 6.666-86.2 9.629-129.447 13.628c-8.886.89-17.92-.296-26.807-.296c-4.591 0-5.776-2.37-5.924-6.37c-1.185-19.703-2.074-39.553-3.851-59.256c-2.222-25.48-4.74-50.96-7.702-76.292c-3.999-35.406-8.442-70.663-12.885-105.92c-4.592-37.184-9.331-74.22-13.774-111.403c-4.443-36.294-8.442-72.736-13.182-109.03c-5.332-41.48-11.256-82.96-16.884-124.439c-6.665-49.033-15.848-97.623-28.437-145.473c-.592-2.074 1.185-6.666 2.962-7.259c41.915-16.889 83.978-33.331 125.892-50.071c13.922-5.63 15.107-7.26 15.255 10.37c.148 75.107.444 150.214 1.63 225.321c.592 39.11 2.073 78.218 4.739 117.18c3.258 47.552 8.294 95.106 12.589 142.659c0 2.074.889 4 1.333 5.185m83.68 218.062a74372 74372 0 0 0 114.784-86.958c-4.74-6.815-109.303-47.85-133.89-53.33c6.221 46.367 12.59 92.587 19.107 140.288m434.12-14.387C733.38 618.113 716.544 413.756 678 210.584c12.553-1.481 25.106-3.258 37.806-4.295c14.62-1.332 29.388-1.925 44.009-3.11c12.257-1.036 16.835 2.222 17.574 14.217c2.215 32.134 4.135 64.268 6.35 96.403c2.953 43.388 6.055 86.925 9.156 130.314c2.215 31.246 4.135 62.64 6.646 93.886c2.805 34.207 5.907 68.267 9.008 102.474c2.215 25.175 4.283 50.497 6.793 75.672c2.658 27.247 5.612 54.495 8.418 81.742c.738 7.849 1.624 15.697 2.215 23.546c.296 4.294-2.067 4.887-6.055 4.442c-21.709-2.221-43.418-3.85-66.603-5.627M572 527.155c17.616-2.517 34.639-5.33 51.662-7.254c12.287-1.48 24.721-1.629 37.008-2.813c6.661-.593 10.954 1.776 11.99 8.29c2.813 17.322 5.773 34.79 7.846 52.26c3.405 29.017 6.07 58.182 9.178 87.199c2.664 25.464 5.329 50.78 8.29 76.243c3.256 27.24 6.809 54.333 10.213 81.425c1.037 7.995 1.777 16.137 2.813 24.872A9507 9507 0 0 0 636.245 857C614.929 747.15 593.612 638.189 572 527.155m382 338.821c-24.084 0-47.276.148-70.468-.296c-1.933 0-5.352-3.409-5.501-5.484c-3.568-37.05-6.69-73.953-9.96-111.004l-9.367-103.149c-3.27-35.42-6.393-70.841-9.663-106.262c-.149-2.074-.595-4.001-1.041-7.113c8.623-1.038 16.8-2.668 25.125-2.668c22.449 0 44.897.593 67.495 1.186c5.798.148 8.325 4.001 8.623 9.336c.743 11.116 1.784 22.083 1.784 33.198c.148 52.167-.149 104.483.297 156.65c.446 41.646 1.784 83.439 2.676 125.084zM622.069 480c-5.307-42.568-10.614-84.102-16.069-127.409c13.857-.148 27.715-.591 41.425-.591c4.57 0 6.634 2.513 7.076 7.538c3.686 38.725 7.519 77.45 11.499 117.654c-14.3.739-29.042 1.773-43.931 2.808M901 364.066c11.937 0 24.619-.148 37.45 0c6.417.148 9.55 2.672 9.55 10.244c-.448 36.224-.15 72.449-.15 108.525V491c-15.367-.742-30.139-1.485-46.7-2.227c-.15-41.124-.15-82.396-.15-124.707M568.569 489c-7.424-41.193-14.996-82.091-22.569-124.023c13.512-2.067 27.023-4.282 40.387-5.906c5.939-.738 4.9 4.43 5.197 7.678c1.633 13.879 2.82 27.61 4.305 41.488c2.376 21.704 4.752 43.408 6.979 64.965c.297 2.805 0 5.758 0 8.859c-11.284 2.362-22.569 4.577-34.299 6.939M839 365.16c12.718 0 25.435.148 38.004-.148c5.685-.149 7.78 1.038 7.63 7.563c-.449 17.352.15 34.704.3 52.204c.15 21.505 0 43.157 0 64.513c-12.868 1.335-24.09 2.373-36.209 3.708c-3.142-41.97-6.433-83.793-9.725-127.84" /></svg>
                                <span className="sr-only">Bilibili</span>
                            </Link>
                            <Link href="https://github.com/bookmarkbao" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                <Github size={20} />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">快速链接</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="https://web.tsdanci.com" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                    图舌单词官网
                                </Link>
                            </li>
                            <li>
                                <Link href="https://ju.deepdanci.com" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                    语音句型跟读
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">英语工具</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="https://peiyin.deepdanci.com" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                    在线角色配音
                                </Link>
                            </li>
                            <li>
                                <Link href="https://deploy-html.deepdanci.com" className="text-muted-foreground hover:text-[#ff6600] transition-colors">
                                    在线HTML部署
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">关注微信公众号</h3>
                        <div className="flex justify-between">
                            <div className="flex flex-col items-center">
                                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <Image
                                        src="https://www.tsdanci.com/_next/static/image/ts_qrcode.jpg"
                                        width={120}
                                        height={120}
                                        alt="关注我们"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="my-8 bg-muted-foreground/20" />
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-center text-sm text-muted-foreground md:text-left hidden">
                        &copy; {new Date().getFullYear()} 贵州向宇科技有限公司.
                    </p>
                    <span>  &copy; {new Date().getFullYear()} </span>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                        <Link href="/privacy-policy" className="hover:text-[#ff6600] transition-colors">
                            隐私政策
                        </Link>
                        <Link href="/terms-of-service" className="hover:text-[#ff6600] transition-colors">
                            使用条款
                        </Link>
                        <Link href="/cookie-policy" className="hover:text-[#ff6600] transition-colors">
                            Cookie政策
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
