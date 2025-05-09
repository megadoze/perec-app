import MultiavatarImage from "@/components/multiavatarImage";
import { getMessages } from "@/lib/getMessages";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);

  return {
    title: messages.authorsTitle,
    description: messages.authorsDescription,
    openGraph: {
      title: messages.authorsTitle,
      description: messages.authorsDescription,
      url: `https://perec.news/${locale}/authors`,
      siteName: messages.ogSiteName,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: messages.authorsTitle,
      description: messages.authorsDescription,
    },
  };
}

export default async function AuthorsPage({ params }) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const authors = messages.authors || [];

  return (
    <section className="mt-10 max-w-3xl mx-auto px-4 pb-16 font-light text-lg">
      <h1 className="text-2xl lg:text-3xl mb-6 font-normal">
        {messages.authorsHeading}
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        {messages.authorsDescription}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {authors.map((author) => (
          <div key={author.style} className="border shadow-sm p-6 bg-white">
            <div className=" flex items-center gap-3">
              <MultiavatarImage avatarId={author.avatar} size={48} />
              <div>
                <h2 className="text-xl font-semibold">{author.name}</h2>
                <p className="text-sm text-red-600 p-0 m-0">
                  {author.character}
                </p>
              </div>
            </div>
            <p className=" text-base text-gray-800 mb-2">{author.tone}</p>
            <blockquote className=" text-gray-800">{author.tagline}</blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
