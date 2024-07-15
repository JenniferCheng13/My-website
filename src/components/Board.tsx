import React, { useState, useEffect } from 'react';
import Card from './Card';

const Board = ({ setGameStatus, handleGameEnd }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flips, setFlips] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds timer
  const [clicksLeft, setClicksLeft] = useState(30); // 30 clicks limit

  useEffect(() => {
    const initialCards = generateCards(8); // 生成8對卡片
    setCards(initialCards);

    // Set up the timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setGameStatus('failed');
          handleGameEnd('failed', 60 - timeLeft, flips);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setGameStatus, handleGameEnd]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameStatus('success');
      handleGameEnd('success', 60 - timeLeft, flips);
    }
  }, [matchedCards, cards.length, flips, setGameStatus, handleGameEnd]);

  const generateCards = (pairCount) => {
    const contents = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, pairCount);
    const cards = [];
    contents.forEach((content) => {
      cards.push({ id: content + '1', content, flipped: false });
      cards.push({ id: content + '2', content, flipped: false });
    });
    return shuffleArray(cards);
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || clicksLeft === 0) return;

    setClicksLeft(clicksLeft - 1);
    if (clicksLeft - 1 === 0) {
      setGameStatus('failed');
      handleGameEnd('failed', 60 - timeLeft, flips);
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    setFlips(flips + 1);

    if (newFlippedCards.length === 2) {
      const [first, second] = newFlippedCards;
      if (cards.find(card => card.id === first).content === cards.find(card => card.id === second).content) {
        setMatchedCards([...matchedCards, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div>
      <p>Time Left: {timeLeft}s</p>
      <p>Clicks Left: {clicksLeft}</p>
      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            content={card.content}
            flipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
