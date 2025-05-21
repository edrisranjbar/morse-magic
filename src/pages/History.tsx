import { Card, CardContent } from '@/components/ui/card';

const History = () => {
  return (
    <div className="container py-8 space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1>The History of Morse Code</h1>
        
        <figure className="my-8">
          <img
            src="/images/samuel-morse.jpg"
            alt="Samuel Morse"
            className="rounded-lg shadow-lg"
          />
          <figcaption className="text-sm text-muted-foreground text-center mt-2">
            Samuel Morse (1791-1872), inventor of Morse code
          </figcaption>
        </figure>

        <h2>Samuel Morse: The Inventor</h2>
        <p>
          Samuel Morse was born on April 27, 1791, in Charlestown, Massachusetts.
          Originally a painter, Morse's interest in telegraphy began during a conversation
          about electromagnets while returning from Europe in 1832. This pivotal moment
          led to the development of what would become known as Morse code.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Early Life</h3>
              <p className="text-muted-foreground">
                Before inventing Morse code, Samuel Morse was a successful painter
                and one of the founders of the National Academy of Design.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">The Inspiration</h3>
              <p className="text-muted-foreground">
                The death of his wife while he was away and the delay in receiving
                the news motivated Morse to develop faster communication methods.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2>Development of Morse Code</h2>
        <p>
          The development of Morse code began in the 1830s and was completed in the
          1840s. The original code was different from the International Morse Code
          we know today. The first message "What hath God wrought?" was transmitted
          from Washington, D.C. to Baltimore on May 24, 1844.
        </p>

        <figure className="my-8">
          <img
            src="/images/first-telegraph.jpg"
            alt="First Telegraph Machine"
            className="rounded-lg shadow-lg"
          />
          <figcaption className="text-sm text-muted-foreground text-center mt-2">
            The first telegraph machine used to transmit Morse code
          </figcaption>
        </figure>

        <h2>Impact on Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Telegraph Era</h3>
              <p className="text-muted-foreground">
                Morse code revolutionized long-distance communication, making it
                possible to send messages across continents instantly.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Maritime Use</h3>
              <p className="text-muted-foreground">
                Became essential for maritime communication and safety, with SOS
                becoming the universal distress signal.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Modern Legacy</h3>
              <p className="text-muted-foreground">
                Still used today in aviation, military, and amateur radio
                communities, proving its enduring value.
              </p>
            </CardContent>
          </Card>
        </div>

        <h2>Evolution of the Code</h2>
        <p>
          The original Morse code was later refined into International Morse Code,
          which standardized the system for non-English languages and became the
          global standard for telegraph communication.
        </p>

        <div className="my-8">
          <h3>Key Dates in Morse Code History</h3>
          <ul>
            <li><strong>1832:</strong> Morse conceives the idea for the telegraph</li>
            <li><strong>1844:</strong> First telegraph message sent</li>
            <li><strong>1851:</strong> Adopted by German and Austrian state telegraphs</li>
            <li><strong>1865:</strong> International Morse Code standardized</li>
            <li><strong>1899:</strong> First use in maritime communication</li>
            <li><strong>1912:</strong> Made mandatory for maritime communication</li>
            <li><strong>1999:</strong> Last official use of Morse code in France</li>
          </ul>
        </div>

        <h2>Cultural Impact</h2>
        <p>
          Morse code has left an indelible mark on popular culture, appearing in
          literature, film, and music. Its distinctive dots and dashes have become
          synonymous with secret messages and emergency communications.
        </p>

        <figure className="my-8">
          <img
            src="/images/modern-morse.jpg"
            alt="Modern Morse Code Usage"
            className="rounded-lg shadow-lg"
          />
          <figcaption className="text-sm text-muted-foreground text-center mt-2">
            Modern applications of Morse code in technology
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default History; 