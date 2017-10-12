1. git和github的区别
   - git： 是一个版本控制工具
   - github ：网站 ->程序员基友网站，可以去学习，代码托管，远程仓库，放静态资源的博客域名地址

2. 如何将本地文件上传到 github 远程仓库
   1. 复制 github 上仓库的地址链接
   2. 在终端上输入  git clone 地址，在本地会生成 一个文件夹（例如：demo）
   3. 将需要上传的文件放在  demo里
   4. 然后输入三行代码：
      - git add .     (从工作区放到暂存区)
      - git commit -m "需要注释的内容"     （从暂存区到版本区，形成版本）
      - git push origin master     （形成版本后，把代码放到远程仓库）

3. Github 的具体操作

   注：共有三个区域：工作区(本地)  ->  暂存区  ->  版本区(形成具体版本号)

   1. 对比三个区的不同

      - 工作区与暂存区的区别     git diff
      - 暂存区与版本区的区别     git diff --cached
      - 工作区与版本区的区别     git diff master

   2. 撤销操作

      1. 可以将暂存区文件撤销回工作区    git reset HEAD 文件名

      2. 工作区代码被删除，可以通过 暂存区或着是 版本区 撤回    git checkout -- 文件名

      3. git commit -m “注释” --amend

         如果有2个以上文件，一个提交到版本库了，另一个忘记提交，
         可以先将没提交的文件拉到暂存区，然后通过git commit -m “注释” --amend 撤销回来，最后自动一次性提交暂存区中的文件和撤销回来的版本形成一个新的版本，
         撤销回来的版本就销毁了，git log查看是否提交成功

      4. git log 查看所有提交过得版本（不包括删除的版本）

         git reflog 查看所有提交过得版本（包括删除的版本）

   3. 删除

      1. 如果手动删除了工作区的文件，也想在git中把它删除 ：    git rm 文件名
      2. 一次性把工作区与暂存区的文件都删掉 ：    git rm -f 文件名
      3. 只删除暂存区，不删除工作区：            git rm --cached 文件名
      4. 删除整个文件夹：     git rm -rf 文件名

   4. 恢复

      1. 恢复一个指定的文件

         git checkout 历史记录编码 文件名（要恢复的文件名）

      2. 恢复一群文件

         git reset --hard 历史记录编码 

      3. 回滚版本记录 ，输出第一次为最近的记录，第二次就是倒数第二个历史记

         git reset --hard HEAD^   [1,2,3,4]

      4. 回滚倒数第三个历史记录 （跳过了2个）

         git reset --hard HEAD~2

         注：如果说git log找不到历史ID，可以通过git reflog去查看操作过的历史记录

   5. 同步到远程仓库

      1. 查看远程仓库名：git remote  (默认origin)
      2. 查看上传地址和下载地址是否为一个地址 ：git remote -v
      3. 创建远程仓库 ：git remote add 名字 github的地址
      4. 上传远程仓库： git push origin(默认) master

   6. 协作

      1. 需要创建项目者给协作者权限

         进入项目 -> settings -> 最左边 Collaborators -> 添加协作者名字

      2. 等待协作者确定

      3. 协作者：

         - 确定协作
         - clone项目
         - 参与项目开发
         - 提交上传

      4. 有可能会遇到冲突:

         1. git pull (直接把远程的代码覆盖到本地)（不太推荐）

         2. git fetch (把远程仓库的代码拉取下来不覆盖)

         3. 查看哪里有冲突

            git diff master origin/master

         4. 合并冲突

            1. git merge origin/master  (你会发现master变成了matser|MERGEING)
            2. 人为判断冲突，把冲突内容删除
            3. 删除完成之后（代码被修改了，需要重新提交）
            4. 保存到版本区之后，继续push （matser|MERGEING就变成了master）

   7. 自己要求协作

      1. 找到想参与的项目fork
      2. 把项目克隆到本地 -> 修改 -> 提交
      3. 点击 Pull requests
      4. 点击 new pull request
      5. 点击 Create pull request
      6. 对话点击Create pull request ，向协作方申请协作，等待
      7. 协作方查看消息后，点击files changed（查看修改内容），merge pull request(可以回复别人)

   8. 分支和合并分支

      1. 新建分支： git branch 分支名

      2. 查看分支： git branch

      3. 切换分支： git checkout 分支名

      4. 快速创建分支和切换：git checkout -b 分支名

      5. 合并分支：git merge 分支名

         可能会出现冲突：认为修改后，提交

      6. 删除已经合并的分支 ：git branch -d 分支名

      7. 删除未合并的分支 ：git branch -D 分支名

      8. 查看已经合并的分支：git branch --merged

      9. 查看未合并的分支：git branch —no-merged


