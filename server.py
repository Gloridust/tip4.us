import os
import git
from config.server import GIT_REPO_PATH, GIT_COMMIT_MESSAGE

def commit_post_file(filename):
    file_path = os.path.join("/posts", filename)
    
    if not os.path.exists(file_path):
        return f"错误: 文件 '{filename}' 不存在。"
    
    try:
        repo = git.Repo(GIT_REPO_PATH)
        
        # 添加文件到暂存区
        repo.index.add([file_path])
        
        # 提交更改
        commit_message = GIT_COMMIT_MESSAGE.format(filename=filename)
        repo.index.commit(commit_message)
        
        # 推送到远程仓库（如果需要）
        # repo.remote().push()
        
        return f"成功: 文件 '{filename}' 已提交到Git仓库。"
    
    except git.GitCommandError as e:
        return f"Git操作错误: {str(e)}"
    except Exception as e:
        return f"发生错误: {str(e)}"