import './App.css';

function App() {
  /* ==================================================
   * 1. 선언부
   * ================================================== */

  const categories = ['한식', '치킨', '분식', '카페·디저트'];


  /* ==================================================
   * 2. 라이프사이클 관리
   * ================================================== */


  /* ==================================================
   * 3. 함수부
   * ================================================== */

  const handleSearch = () => {
    console.log('검색');
  };


  /* ==================================================
   * 4. 화면
   * ================================================== */

  return (
    <main className="yg-page">
      <div className="yg-container">
        <section className="yg-section yg-column">
          <span className="yg-badge">오늘의 추천</span>

          <h1 className="yg-page-title">
            지금 어떤 음식이
            <br />
            생각나시나요?
          </h1>

          <p className="yg-description">
            원하는 메뉴나 가게를 검색해 보세요.
          </p>
        </section>

        <section className="yg-section">
          <div className="yg-field">
            <label className="yg-label" htmlFor="keyword">
              메뉴 검색
            </label>

            <input
              id="keyword"
              className="yg-input"
              placeholder="메뉴 또는 가게 이름"
            />
          </div>
        </section>

        <section className="yg-section">
          <h2 className="yg-section-title">카테고리</h2>

          <div className="app__category-list">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className="yg-category"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="yg-button yg-button--primary yg-button--full"
          onClick={handleSearch}
        >
          맛집 찾기
        </button>
      </div>
    </main>
  );
}

export default App;