import os
# import git
from config import GIT_REPO_PATH, GIT_COMMIT_MESSAGE

import requests
from bs4 import BeautifulSoup

from requests_html import HTMLSession


def fetch_tweet_details(tweet_url):
    session = HTMLSession()
    response = session.get(tweet_url)
    
    # 等待页面的JavaScript加载完毕
    response.html.render(timeout=20)

    try:
        # 获取博主用户名
        username_tag = response.html.find('div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-dnmrzs', first=True)
        username = username_tag.text if username_tag else 'N/A'
        
        # 获取推文内容
        content_tag = response.html.find('div[data-testid="tweetText"]', first=True)
        content = content_tag.text if content_tag else 'N/A'
        
        # 获取推文中的图片
        images = []
        image_tags = response.html.find('img[src*="twimg.com/media"]')
        for img in image_tags:
            images.append(img.attrs['src'])
        
        tweet_details = {
            'username': username,
            'content': content,
            'images': images
        }
        
        return tweet_details
    except Exception as e:
        print(f"Error: {e}")
        return None


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
    
    details = fetch_tweet_details("https://x.com/yetone/status/1807784086854918506")

    if details:
        print(f"Username: {details['username']}")
        print(f"Content: {details['content']}")
        print("Images:")
        for img_url in details['images']:
            print(img_url)