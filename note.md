successResponse(res, 200, "successfully", { deletedProduct });

errorResponse(res, 500, "Internal server error");

git init && git add README.md && git commit -m "first commit" && git branch -M main && git remote add origin https://github.com/sonn1228/api_pm.git && git push -u origin main

Docker build -t api_app .
docker run -p 3333:3000 api_app
docker run -p 3333:3000 -v $(pwd):/app api_app
docker run -p 3333:3000 api_pm
vercel env add MONGO_URI mongodb+srv://abc:XhNp5mC9sNutnUyv@cluster0.hh7hivb.mongodb.net/api
