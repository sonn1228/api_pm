# Sử dụng image Node.js chính thức làm base image
FROM node:16

WORKDIR /app
# Đặt thư mục làm việc default /app bên trong container.

COPY package*.json ./
RUN npm install
COPY . .
# copy root and ignore in Dockerfile

# Cài đặt dependencies
RUN npm install

# Expose port 3000
EXPOSE 3001

CMD ["npm", "start"]
# npm start
# docker build -t myapp . && docker run --rm -p 3000:3000 myapp