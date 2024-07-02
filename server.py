import os
# import git
from config import GIT_REPO_PATH, GIT_COMMIT_MESSAGE

import requests
from bs4 import BeautifulSoup

def fetch_tweet_details(tweet_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    response = requests.get(tweet_url, headers=headers)
    
    if response.status_code != 200:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return None
    
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 获取博主用户名
    username_tag = soup.find('div', {'class': 'css-1dbjc4n r-18u37iz r-thb0q2'})
    username = username_tag.get_text(strip=True) if username_tag else 'N/A'
    
    # 获取推文内容
    content_tag = soup.find('div', {'class': 'css-901oao r-1sixt3s r-1b6yd1w r-1a6sy4m r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0'})
    content = content_tag.get_text(strip=True) if content_tag else 'N/A'
    
    # 获取推文中的图片
    images = []
    image_tags = soup.find_all('img', {'class': 'css-9pa8cd'})
    for img in image_tags:
        images.append(img['src'])
    
    tweet_details = {
        'username': username,
        'content': content,
        'images': images
    }
    
    return tweet_details

# 示例推文URL
tweet_url = 'https://twitter.com/some_user/status/1234567890123456789'
details = fetch_tweet_details(tweet_url)

if details:
    print(f"Username: {details['username']}")
    print(f"Content: {details['content']}")
    print("Images:")
    for img_url in details['images']:
        print(img_url)


def git_commit_post(filename):
    try:
        # 获取完整的文件路径
        file_path = os.path.join(GIT_REPO_PATH, "posts", filename)
        
        # 检查文件是否存在
        if not os.path.exists(file_path):
            return f"错误: 文件 '{filename}' 不存在。"
        
        # 初始化 git 仓库
        repo = git.Repo(GIT_REPO_PATH)
        
        # 添加文件到暂存区
        repo.index.add([file_path])
        
        # 提交更改
        commit_message = GIT_COMMIT_MESSAGE.format(filename=filename)
        repo.index.commit(commit_message)
        
        # 推送到远程仓库（如果需要的话）
        repo.remote().push()
        
        return f"成功: 文件 '{filename}' 已提交到 git 仓库。"
    
    except git.exc.GitCommandError as e:
        return f"Git 错误: {str(e)}"
    except Exception as e:
        return f"发生错误: {str(e)}"


if __name__ == "__main__":
    fetch_tweet_details("https://x.com/yetone/status/1807784086854918506")