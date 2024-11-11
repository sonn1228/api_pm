# Sử dụng image Node.js chính thức làm base image
FROM node:16

WORKDIR /app
# Đặt thư mục làm việc default /app bên trong container.

COPY package*.json ./
# Sao chép file package.json và package-lock.json vào container
RUN npm install
COPY . .
# copy source code to workdir 
# ignore in Dockerfile

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container

# Expose cổng 3000 để ứng dụng có thể truy cập
# Chỉ mang tính chất tài liệu
EXPOSE 3001

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]


# docker build -t myapp . && docker run --rm -p 3000:3000 myapp
