"use client"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import React from "react"
const metadata: Metadata = {
    title: "使用条款 | 图舌单词",
    description: "了解使用我们服务的条款和条件",
}

export function TermsOfServicePage() {
    return (
        <div className="mx-auto container max-w-3xl py-12 pt-4">
            <Link href="/" className="flex gap-2 mb-4 items-center hover:text-[#ff5500]">
                <ArrowLeft className="w-4 h-4" />返回
            </Link>
            <h1 className="mb-6 text-3xl font-bold text-center">使用条款</h1>
            <div className="space-y-6 text-muted-foreground">
                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">接受条款</h2>
                    <p>
                        欢迎使用贵州向宇科技有限公司（以下简称"我们"）提供的服务。通过访问或使用我们的网站、应用程序或任何相关服务，您同意受本使用条款的约束。如果您不同意这些条款，请勿使用我们的服务。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">账户责任</h2>
                    <p>
                        如果您创建账户，您负责维护账户安全并对账户内发生的所有活动负完全责任。您必须立即通知我们任何未经授权使用您账户的情况。我们不对您未能遵守上述要求而造成的任何损失负责。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">服务使用</h2>
                    <p>您同意不会：</p>
                    <ul className="ml-6 list-disc space-y-2">
                        <li>以任何可能损害、禁用或过度负担我们服务的方式使用服务</li>
                        <li>尝试未经授权访问我们的系统或网络</li>
                        <li>使用自动化程序、机器人或其他方式批量访问我们的服务</li>
                        <li>传播恶意软件或其他破坏性代码</li>
                        <li>侵犯他人的知识产权、隐私或其他权利</li>
                        <li>违反任何适用法律或法规</li>
                    </ul>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">知识产权</h2>
                    <p>
                        我们的服务及其原始内容、功能和设计受中华人民共和国及国际版权、商标、专利、商业秘密和其他知识产权法律保护。未经我们明确许可，您不得复制、修改、创建衍生作品、公开展示、重新发布、下载、存储或传输任何材料。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">用户内容</h2>
                    <p>
                        对于您提交、发布或显示在我们服务上的任何内容，您授予我们非独占、免版税、全球性、可再许可和可转让的许可，以使用、复制、修改、创建衍生作品、分发、公开展示和执行该内容。您声明并保证您拥有或已获得发布此类内容所需的所有权利和许可。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">免责声明</h2>
                    <p>
                        我们的服务按"现状"和"可用"基础提供，没有任何明示或暗示的保证。我们不保证服务将不间断、及时、安全或无错误，也不保证服务将满足您的要求或期望。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">责任限制</h2>
                    <p>
                        在法律允许的最大范围内，我们及我们的董事、员工、合作伙伴和代理人不对因使用或无法使用我们的服务而导致的任何间接、偶然、特殊、后果性或惩罚性损害负责，包括但不限于利润损失、数据损失、替代服务的费用或其他无形损失。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">条款修改</h2>
                    <p>
                        我们保留随时修改或替换这些条款的权利。修改后的条款将在我们的网站上发布。您继续使用我们的服务将构成您对修改后条款的接受。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">终止</h2>
                    <p>
                        我们可以因任何原因随时终止或暂停您对我们服务的访问，包括但不限于违反这些条款。终止后，您使用服务的权利将立即停止。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">适用法律</h2>
                    <p>
                        这些条款应受中华人民共和国法律管辖并按其解释，不考虑法律冲突原则。与这些条款有关的任何法律诉讼应提交给中华人民共和国的法院。
                    </p>
                </section>

                <section>
                    <h2 className="mb-3 text-xl font-semibold text-foreground">联系我们</h2>
                    <p>
                        如果您对本使用条款有任何问题，请联系我们：
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