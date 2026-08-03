/**
 * React Router navigate 함수로 정규화
 * @param {object|function} routerOrNavigate createBrowserRouter 인스턴스 또는 useNavigate()의 반환 함수
 * @returns {function|null}
 */
function resolveNavigate(routerOrNavigate) {
  if (typeof routerOrNavigate === 'function') {
    return routerOrNavigate;
  }

  if (routerOrNavigate && typeof routerOrNavigate.navigate === 'function') {
    return routerOrNavigate.navigate.bind(routerOrNavigate);
  }

  return null;
}

/**
 * 쿼리 객체를 React Router용 search string으로 변환
 * @param {object|null} query 쿼리 파라미터 객체
 * @returns {string}
 */
function buildSearch(query) {
  if (!query || typeof query !== 'object') {
    return '';
  }

  const searchParams = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          searchParams.append(key, String(item));
        }
      });
      return;
    }

    searchParams.set(key, String(value));
  });

  const search = searchParams.toString();
  return search ? `?${search}` : '';
}

/**
 * 주어진 경로(path)로 라우팅하는 유틸리티 함수
 * @param {object|function} routerOrNavigate createBrowserRouter 인스턴스 또는 useNavigate()의 반환 함수
 * @param {string} path 이동할 페이지 경로 (예: '/auth/sign-up', '/main')
 * @param {object|null} query 쿼리 파라미터 객체 (예: { id: 1, name: 'test' })
 */
export function navigateTo(routerOrNavigate, path, query = null) {
  const navigate = resolveNavigate(routerOrNavigate);

  if (!navigate || !path) {
    console.error('[Router Util] navigate 함수 또는 경로(path)가 유효하지 않습니다.');
    return;
  }

  const search = buildSearch(query);
  const destination = search ? `${path}${search}` : path;

  console.log(`[Router Util] Navigating to: ${destination}`);
  navigate(destination);
}

/**
 * 이전에 방문한 페이지로 돌아가되 히스토리가 없으면 fallback 경로로 이동
 * @param {object|function} routerOrNavigate createBrowserRouter 인스턴스 또는 useNavigate()의 반환 함수
 * @param {string|null} fallbackPath 히스토리가 없을 때 이동할 경로
 */
export function goBack(routerOrNavigate, fallbackPath = null) {
  const navigate = resolveNavigate(routerOrNavigate);
  if (!navigate) {
    console.error('[Router Util] navigate 함수가 유효하지 않습니다.');
    return;
  }

  const hasHistory = typeof window !== 'undefined' && window.history.length > 1;
  if (hasHistory) {
    console.log('[Router Util] Going back to previous page');
    navigate(-1);
    return;
  }

  if (fallbackPath) {
    console.log(`[Router Util] No history. Navigating to fallback: ${fallbackPath}`);
    navigate(fallbackPath);
    return;
  }

  console.warn('[Router Util] No history and no fallbackPath provided.');
}

/**
 * 앞으로 이동하는 유틸리티 함수
 * @param {object|function} routerOrNavigate createBrowserRouter 인스턴스 또는 useNavigate()의 반환 함수
 */
export function goForward(routerOrNavigate) {
  const navigate = resolveNavigate(routerOrNavigate);

  if (!navigate) {
    console.error('[Router Util] navigate 함수가 유효하지 않습니다.');
    return;
  }

  console.log('[Router Util] Going forward to next page');
  navigate(1);
}

/**
 * 특정 단계만큼 히스토리를 이동하는 유틸리티 함수
 * @param {object|function} routerOrNavigate createBrowserRouter 인스턴스 또는 useNavigate()의 반환 함수
 * @param {number} delta 이동할 단계 (음수: 뒤로, 양수: 앞으로)
 */
export function go(routerOrNavigate, delta) {
  const navigate = resolveNavigate(routerOrNavigate);

  if (!navigate || typeof delta !== 'number') {
    console.error('[Router Util] navigate 함수 또는 delta 값이 유효하지 않습니다.');
    return;
  }

  console.log(`[Router Util] Moving ${delta > 0 ? 'forward' : 'back'} ${Math.abs(delta)} step(s)`);
  navigate(delta);
}