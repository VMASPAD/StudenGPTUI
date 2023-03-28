/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Message } from "@/types";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "../Markdown/CodeBlock";
const gpt = "https://thelasttrombone.files.wordpress.com/2022/12/chatgpt_logo.jpg"
console.log(gpt)
interface Props {
  message: Message;
  lightMode: "light" | "dark";
}

export const ChatMessage: FC<Props> = ({ message, lightMode }) => {
  return (
    <div
      className={`group ${message.role === "assistant" ? "text-yellow-50 dark:text-yellow-50 border-b border-teal-500/10 dark:border-teal-500/50 bg-yellow-50 dark:bg-[#ca8145]" : "text-yellow-50 dark:text-yellow-50 border-b border-black/10 dark:border-teal-500/50 bg-yellow-50 dark:bg-[#E76F51]"}`}
      style={{ overflowWrap: "anywhere" }}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0 m-auto">
      <div className="font-bold min-w-[40px]" style={{borderRadius:"5px", minWidth:"5%", maxWidth:"5%"}}>
  {message.role === "assistant" ? (
    <img src={gpt} style={{borderRadius: '10px'}}/>
  ) : (
    "You:"
  )}
</div>

        <div className="prose dark:prose-invert mt-[-2px]" style={{color:"#ffffff"}}>
          {message.role === "user" ? (
            <div className="prose dark:prose-invert whitespace-pre-wrap" style={{color:"#ffffff"}}>{message.content}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <CodeBlock
                      key={Math.random()}
                      language={match[1]}
                      value={String(children).replace(/\n$/, "")}
                      lightMode={lightMode}
                      {...props}
                    />
                  ) : (
                    <code
                      className={className}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                table({ children }) {
                  return <table className="border-collapse border border-black dark:border-white py-1 px-3">{children}</table>;
                },
                th({ children }) {
                  return <th className="border border-black dark:border-white break-words py-1 px-3 bg-yellow-50 text-white">{children}</th>;
                },
                td({ children }) {
                  return <td className="border border-black dark:border-white break-words py-1 px-3">{children}</td>;
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};
