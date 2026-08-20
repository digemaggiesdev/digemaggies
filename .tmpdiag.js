const { chromium } = require('playwright');
(async() => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1600 } });
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQUEST_FAILED:', req.url(), req.failure()?.errorText));
  await page.goto('http://localhost:8000/pages/sponsorpage/sponsorindex.html', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('TITLE:', await page.title());
  const chartExists = await page.$('#fundingChart');
  console.log('CHART_EXISTS:', !!chartExists);
  const chartText = await page.locator('#amountRaised').textContent();
  console.log('AMOUNT_TEXT:', chartText);
  const canvasSize = await page.locator('#fundingChart').evaluate(el => ({
    width: el.width,
    height: el.height,
    clientWidth: el.clientWidth,
    clientHeight: el.clientHeight,
    style: { width: el.style.width, height: el.style.height }
  }));
  console.log('CANVAS_SIZE:', JSON.stringify(canvasSize));
  await page.screenshot({ path: '/tmp/sponsor-page.png', fullPage: true });
  await browser.close();
})();
