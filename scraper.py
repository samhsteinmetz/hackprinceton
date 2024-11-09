import schedule
import time
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from datetime import datetime
import sqlite3
from concurrent.futures import ThreadPoolExecutor

# Setup logging
logging.basicConfig(filename="scraper.log", level=logging.INFO)

# Database setup
conn = sqlite3.connect("scraped_data.db")
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS news
                  (timestamp TEXT, website TEXT, headline TEXT, link TEXT)''')
conn.commit()

# Setup Chrome driver with options (single driver instance)
def create_driver():
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    service = Service('/Users/samstein/hackprinceton/webdrivers/chromedriver')  # Adjust path as needed
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.set_page_load_timeout(280)
    return driver

# Initialize a single driver instance to reuse across jobs
driver = create_driver()

# Use explicit waits instead of fixed sleep times
def load_page(driver, url, element_selector, by=By.CSS_SELECTOR, timeout=10):
    """Load a page and wait for a specific element to be present."""
    driver.get(url)
    WebDriverWait(driver, timeout).until(EC.presence_of_element_located((by, element_selector)))
    return BeautifulSoup(driver.page_source, "html.parser")

# Scraping function for Website 1
def scrape_site1():
    url = "https://techcrunch.com/"
    soup = load_page(driver, url, "div.post-block")
    logging.info(f"Scraping {url}")
    print("scraped site 1")

    for article in soup.find_all("div", class_="post-block"):
        headline = article.find("h2").get_text(strip=True)
        link = article.find("a")["href"]
        logging.info(f"Scraped headline: {headline}")
        save_data("TechCrunch", headline, link)

# Scraping function for Website 2
def scrape_site2():
    url = "http://quotes.toscrape.com/"
    soup = load_page(driver, url, "div.quote")
    logging.info(f"Scraping {url}")
    print("scraped site 2")

    for quote in soup.find_all("div", class_="quote"):
        headline = quote.find("span", class_="text").get_text(strip=True)
        link = "http://quotes.toscrape.com"  # Base URL for quotes site
        logging.info(f"Scraped quote: {headline}")
        save_data("Quotes", headline, link)

# Save data to SQLite with batched commits
def save_data(website, headline, link):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cursor.execute("INSERT INTO news (timestamp, website, headline, link) VALUES (?, ?, ?, ?)",
                   (timestamp, website, headline, link))

# Commit batched data periodically
def commit_data():
    conn.commit()
    logging.info("Committed data to database")

# Master function to scrape all sites concurrently
def scrape_all_sites():
    logging.info("Scraping all sites concurrently")
    print("Scraping all sites concurrently")
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(scrape_site1), executor.submit(scrape_site2)]
        for future in futures:
            try:
                future.result()
            except Exception as e:
                logging.error(f"Error in scrape_all_sites: {e}")

    commit_data()  # Commit data after each round of scraping

# Schedule scraping every 10 minutes
schedule.every(10).seconds.do(scrape_all_sites)

# Run scheduled tasks
if __name__ == "__main__":
    logging.info("Starting scraper")
    try:
        while True:
            schedule.run_pending()
            print("waiting for next bob...")
            time.sleep(1)
    finally:
        driver.quit()
        conn.close()
