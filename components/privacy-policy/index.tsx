"use client"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import React from "react"
const metadata: Metadata = {
    title: "隐私政策 | 图舌单词",
    description: "了解我们如何收集、使用和保护您的个人信息",
}

export function PrivacyPolicyPage() {
    return (
        <div className="mx-auto container max-w-3xl py-12 pt-4">
            <Link href="/" className="flex gap-2 mb-4 items-center hover:text-[#ff5500]">
                <ArrowLeft className="w-4 h-4" />返回
            </Link>
            <h1 className="mb-6 text-3xl font-bold  text-center">隐私政策</h1>
            <div className="space-y-6 text-muted-foreground">
                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">概述</h2>
                    <p>
                        本隐私政策描述了贵州向宇科技有限公司（以下简称"我们"）如何收集、使用、存储和保护您的个人信息。当您使用我们的服务时，即表示您同意本隐私政策中描述的做法。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">信息收集</h2>
                    <p>我们可能收集以下类型的信息：</p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>个人识别信息（如姓名、电子邮件地址、电话号码等）</li>
                        <li>账户信息（如用户名和密码）</li>
                        <li>交易信息（如购买历史）</li>
                        <li>使用数据（如您如何使用我们的服务）</li>
                        <li>设备信息（如IP地址、浏览器类型和设备标识符）</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">信息使用</h2>
                    <p>我们使用收集的信息来：</p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>提供、维护和改进我们的服务</li>
                        <li>处理交易并发送相关通知</li>
                        <li>响应您的请求和提供客户支持</li>
                        <li>发送技术通知、更新和安全警报</li>
                        <li>发送营销通讯（您可以随时选择退出）</li>
                        <li>监控我们服务的使用情况</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">信息共享</h2>
                    <p>
                        我们不会出售您的个人信息。我们可能会在以下情况下共享您的信息：
                    </p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>在得到您的同意的情况下</li>
                        <li>与提供服务所需的第三方服务提供商</li>
                        <li>为遵守法律义务、法院命令或法律程序</li>
                        <li>为保护我们的权利、财产或安全，或他人的权利、财产或安全</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">数据安全</h2>
                    <p>
                        我们实施了合理的安全措施，以保护您的个人信息免受未经授权的访问和披露。然而，没有任何互联网传输或电子存储方法是100%安全的。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">您的权利</h2>
                    <p>根据适用的数据保护法律，您可能有权：</p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>访问和获取我们持有的关于您的个人信息副本</li>
                        <li>要求我们更正不准确的信息</li>
                        <li>要求删除您的个人信息</li>
                        <li>反对或限制我们处理您的个人信息</li>
                        <li>数据可携性</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">隐私政策更新</h2>
                    <p>
                        我们可能会不时更新本隐私政策。我们会通过在本页面上发布新版本来通知您任何更改。请定期查看本页面以了解任何变化。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">联系我们</h2>
                    <p>
                        如果您对本隐私政策有任何疑问或疑虑，请联系我们：
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
