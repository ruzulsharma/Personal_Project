import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [stage, setStage] = useState("intro"); // intro / sorry / yes / final / end
  const [showHeart, setShowHeart] = useState(false);
  const audioRef = useRef(new Audio("/song.mp3")); // <-- correct way
  const [songPlaying, setSongPlaying] = useState(false);

  // Play song once first click and repeat after ending
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => audio.play(); // loop after ending

    if (songPlaying) {
      audio.play().catch(() => {
        console.log("Autoplay might be blocked. Try clicking first!");
      });
      audio.addEventListener("ended", handleEnded);
    }

    return () => audio.removeEventListener("ended", handleEnded);
  }, [songPlaying]);

  const handleYesIntro = () => {
    setSongPlaying(true);
    setStage("yes");
  };

  const handleNoIntro = () => {
    setSongPlaying(true);
    setStage("sorry");
    setTimeout(() => setShowHeart(true), 1000);
  };

  const handleHeartClick = () => {
    setShowHeart(false);
    setStage("intro");
  };

  const handleYesFinal = () => setStage("end");
  const handleNoFinal = () => {
    setStage("sorry");
    setTimeout(() => setShowHeart(true), 1000);
  };

  return (
    <div className="container">
      {/* Intro Card Stage */}
      {stage === "intro" && (
        <div className="card">
          <h1 className="title">Oops… 😬</h1>
          <p className="message">
            Hey! I know I’ve messed up 😅 … I promise to make it up to you!
            Maan jaaaaa!!
          </p>
          <div className="buttons">
            <button className="button yes" onClick={handleYesIntro}>
              Yes 😇
            </button>
            <button className="button no" onClick={handleNoIntro}>
              No 😅
            </button>
          </div>
        </div>
      )}

      {/* Sorry Stage */}
      {stage === "sorry" && (
        <div className="sorry-page">
          {Array.from({ length: 99 }).map((_, i) => (
            <span key={i} className="sorry-text">
              Sorry 😢
            </span>
          ))}
        </div>
      )}

      {showHeart && stage === "sorry" && (
        <div className="bouncing-heart" onClick={handleHeartClick}>
          ❤️
        </div>
      )}

      {/* Yes Stage */}
      {stage === "yes" && (
        <div className="yes-page">
          <p className="message-yes">
            You're the best I can get! ❤️ <br />
            Thanks for being such an amazing friend! <br />
            You truly make my days brighter and happier! 🌟
          </p>
          <div className="stickers">
            <span>🌸</span>
            <span>🦄</span>
            <span>🐱‍👤</span>
            <span>🍦</span>
            <span>🌈</span>
          </div>
          <button className="button final" onClick={() => setStage("final")}>
            Next 🎉
          </button>
        </div>
      )}

      {/* Final Forgive Stage */}
      {stage === "final" && (
        <>
          <h1 className="title">Do you forgive me? 😇</h1>
          <div className="buttons">
            <button className="button yes" onClick={handleYesFinal}>
              Yes 😇
            </button>
            <button className="button no" onClick={handleNoFinal}>
              No 😅
            </button>
          </div>
        </>
      )}

      {/* End Stage */}
      {stage === "end" && (
        <div className="end-page">
          <p className="message-yes">
            ❤️ Thank you! You're amazing! 🌟
          </p>
          <div className="stickers">
            <span>🎉</span>
            <span>🌈</span>
            <span>💖</span>
            <span>🐱</span>
            <span>🍦</span>
          </div>
        </div>
      )}

      <footer className="footer">powered by RUZUL</footer>
    </div>
  );
}

export default App;
