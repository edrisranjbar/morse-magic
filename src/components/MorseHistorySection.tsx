const MorseHistorySection = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
            The History of Morse Code
          </h2>
          <div className="w-20 h-1 bg-zinc-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-800">
            <img
              src="/morse-magic/samuel-morse.jpg"
              alt="Samuel Morse - Inventor of Morse Code"
              className="w-full h-full object-top"
            />
          </div>

          <div className="space-y-4 text-zinc-300">
            <p>
              Morse Code was developed in the 1830s by Samuel Morse and his assistant Alfred Vail. 
              It was created as a means of communication for the telegraph, revolutionizing long-distance 
              communication.
            </p>
            <p>
              The code uses a series of dots and dashes to represent letters, numbers, and punctuation. 
              Each character is represented by a unique combination of these signals, making it possible 
              to transmit messages across great distances using electrical signals.
            </p>
            <p>
              Initially used for telegraphy, Morse Code became essential in maritime communication and 
              was later adopted by the military. It played a crucial role in both World Wars and 
              continues to be used in various applications today, including amateur radio and emergency 
              communications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorseHistorySection; 