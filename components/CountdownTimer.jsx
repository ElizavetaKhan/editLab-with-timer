import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TimerContainer = styled.div`
  padding: 40px 20px;
  margin: 40px 0;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%);
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(238, 90, 111, 0.3);
`;

const TimerTitle = styled.h3`
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TimerSubtitle = styled.p`
  font-size: clamp(14px, 2vw, 18px);
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
  font-weight: 500;
`;

const TimerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const TimerUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  
  @media (max-width: 480px) {
    padding: 16px 8px;
  }
`;

const TimerValue = styled.div`
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  color: white;
  line-height: 1;
  margin-bottom: 8px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const TimerLabel = styled.div`
  font-size: clamp(11px, 1.5vw, 14px);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const UrgencyText = styled.div`
  margin-top: 24px;
  font-size: clamp(16px, 2.5vw, 20px);
  color: white;
  font-weight: 700;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // Если дата не передана, устанавливаем дефолтную дату (например, через 7 дней)
    const defaultDate = targetDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const target = new Date(defaultDate).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (expired) {
    return (
      <TimerContainer>
        <TimerTitle>Курс уже начался!</TimerTitle>
        <TimerSubtitle>Присоединяйся прямо сейчас</TimerSubtitle>
      </TimerContainer>
    );
  }

  return (
    <TimerContainer>
      <TimerTitle>⏰ До начала курса осталось</TimerTitle>
      <TimerSubtitle>Успей записаться и получи доступ к бонусным материалам</TimerSubtitle>
      <TimerGrid>
        <TimerUnit>
          <TimerValue>{String(timeLeft.days).padStart(2, '0')}</TimerValue>
          <TimerLabel>Дней</TimerLabel>
        </TimerUnit>
        <TimerUnit>
          <TimerValue>{String(timeLeft.hours).padStart(2, '0')}</TimerValue>
          <TimerLabel>Часов</TimerLabel>
        </TimerUnit>
        <TimerUnit>
          <TimerValue>{String(timeLeft.minutes).padStart(2, '0')}</TimerValue>
          <TimerLabel>Минут</TimerLabel>
        </TimerUnit>
        <TimerUnit>
          <TimerValue>{String(timeLeft.seconds).padStart(2, '0')}</TimerValue>
          <TimerLabel>Секунд</TimerLabel>
        </TimerUnit>
      </TimerGrid>
      <UrgencyText>
        🔥 Места ограничены! Запишись сейчас, пока есть возможность
      </UrgencyText>
    </TimerContainer>
  );
};
