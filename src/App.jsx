import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  /* ==================================================
   * 1. 선언부
   * ================================================== */

  // 상태
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  // DOM 참조
  const inputRef = useRef(null);

  // 일반 변수
  const title = 'React Example';


  /* ==================================================
   * 2. 라이프사이클 관리
   * ================================================== */

  // 컴포넌트 최초 마운트
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다.');

    // 컴포넌트 언마운트
    return () => {
      console.log('컴포넌트가 언마운트되었습니다.');
    };
  }, []);

  // count 변경 감지
  useEffect(() => {
    console.log('count 변경:', count);
  }, [count]);


  /* ==================================================
   * 3. 함수부
   * ================================================== */

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('');
    inputRef.current?.focus();
  };


  /* ==================================================
   * 4. 화면
   * ================================================== */

  return (
    <main className="app">
      <h1>{title}</h1>

      <section className="counter">
        <button type="button" onClick={handleDecrease}>
          감소
        </button>

        <span>{count}</span>

        <button type="button" onClick={handleIncrease}>
          증가
        </button>
      </section>

      <section className="message">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="메시지를 입력하세요."
        />

        <p>{message}</p>
      </section>

      <button type="button" onClick={handleReset}>
        초기화
      </button>
    </main>
  );
}

export default App;