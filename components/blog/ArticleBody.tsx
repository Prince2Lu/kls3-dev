import ReactMarkdown from 'react-markdown'

interface ArticleBodyProps {
  content: string
}

export default function ArticleBody({ content }: ArticleBodyProps) {
  return (
    <div className="prose prose-invert prose-lg max-w-none">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-foreground mb-6 mt-8">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold text-foreground mb-4 mt-8">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold text-foreground mb-3 mt-6">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-foreground/80 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-foreground/80 mb-4 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-foreground/80 mb-4 space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="ml-4">{children}</li>,
          code: ({ children, className }) => {
            const isInline = !className
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 bg-dark-surface border border-dark-border rounded text-brand-cyan-light text-sm">
                  {children}
                </code>
              )
            }
            return (
              <code className="block p-4 bg-dark-surface border border-dark-border rounded-lg text-sm overflow-x-auto mb-4">
                {children}
              </code>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand-purple pl-4 italic text-foreground/70 my-4">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-brand-cyan-light hover:text-brand-cyan underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
