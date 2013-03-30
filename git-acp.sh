#!/bin/bash
repository="https://github.com/xtbl/multi-bg-animation.git";
echo "========================="
echo "Git: Add + Commit + Push"
echo "========================="
git status
echo "Git add ."
git add .
read -p "commit description: " desc
git commit -m "$desc"
git push $repository
echo "=================================================="
echo " (\___/)"
echo " (=’.'=) <  Files added, committed and pushed!"
echo " (“)_(“)"	
echo "=================================================="