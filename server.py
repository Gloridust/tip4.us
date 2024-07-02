import os
# import git
from config import GIT_REPO_PATH, GIT_COMMIT_MESSAGE

import requests
from bs4 import BeautifulSoup

import twint

def fetch_tweet_details(tweet_url):
    try:
        # 从URL中提取推文ID
        tweet_id = tweet_url.split('/')[-1]

        # 使用twint获取推文信息
        c = twint.Config()
        c.Tweet_id = tweet_id
        c.Hide_output = True
        c.Store_object = True

        twint.run.Lookup(c)
        tweet = twint.output.tweets_list[0]

        tweet_details = {
            'username': tweet.username,
            'content': tweet.tweet,
            'images': tweet.photos
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