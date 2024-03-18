import { Button } from '@mui/material';
import React from 'react';
import { useState, useEffect } from 'react';

type Props = {
  time: any;
  onCountdownEnd: any;
  page: any;
  onClick?: () => void;
  onCancel: any;
};

const Countdown = ({ time, onCountdownEnd, page, onClick,onCancel }: Props) => {
  const [countdownTime, setCountdownTime] = useState(time);
  const [isCancelled, setIsCancelled] = useState(false);
  useEffect(() => {
    if (isCancelled || countdownTime <= 0) {
      if (!isCancelled) {
        onCountdownEnd();
      }
      return;
    }

    const timer = setInterval(() => {
      setCountdownTime((prevTime: any) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTime, isCancelled, onCountdownEnd]);

  const handleCancel = () => {
    setIsCancelled(true);
    onCancel();
  };
  return (
    <>
      <div>
        Còn {countdownTime} giây sẽ chuyển đến trang
        <span style={{ color: '#3C8DBC', paddingLeft: '5px' }}>{page}</span>
      </div>
      <div>
        <Button onClick={onClick}>Chuyển đến</Button>
        <Button onClick={handleCancel}>Ở lại trang</Button>
      </div>
    </>
  );
};

export default Countdown;
