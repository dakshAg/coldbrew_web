from selenium import webdriver
from selenium.webdriver.common.by import By


def image_search(image_path): #input: path of the image that a user uploaded
    #path of webdriver executable
    webdriver_path = "/image_search"

    #new Chrome webdriver instance
    driver = webdriver.Chrome(webdriver_path)
    driver.get("https://www.google.com/imghp")

    # find the "Search by image" icon and click it
    search_by_image_icon = driver.find_element(By.XPATH, "/html/body/div[1]/div[3]/form/div[1]/div[1]/div[1]/div/div[3]/div[3]")
    search_by_image_icon.click()

    # wait for the search options to appear
    driver.implicitly_wait(3)

    # click on the "Paste image link" option
    paste_image_link_option = driver.find_element(By.XPATH, '//*[@id="ow6"]/div[3]/c-wiz/div[2]/div/div[3]/div[2]/c-wiz/div[2]/input')
    paste_image_link_option.click()

    # paste the image link
    paste_image_link_option.clear()
    paste_image_link_option.send_keys(image_path)

    # click the "Search" button to start the search
    search_button = driver.find_element(By.XPATH, "//div[text()='Search']")
    search_button.click()

    # wait for the search results to load
    driver.implicitly_wait(3)

    #save the first five search results by its url and image link
    top5_search_results = []
    for i in range(1, 6):
        href_result = driver.find_element(By.XPATH, '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/c-wiz/div/div[2]/div/div/div/div[1]/div/div[3]/div[2]/div/div/div/div[1]/div[{}]/div/a'.format(i))
        url = href_result.get_attribute("href")
        src_result = driver.find_element(By.XPATH, '//*[@id="yDmH0d"]/c-wiz/div/div[2]/div/c-wiz/div/div[2]/div/div/div/div[1]/div/div[3]/div[2]/div/div/div/div[1]/div[{}]/div/a/div/div[1]/div/img'.format(i))
        image_link = src_result.get_attribute("src")
        top5_search_results.append({"url": url, "image": image_link})
