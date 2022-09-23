import { useEffect, useState } from "react";

const Countdown = ({ expiryDate }) => {
  const [countDown, setCountDown] = useState(expiryDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(expiryDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

export { Countdown };
