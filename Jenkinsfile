// /Jenkinsfile
pipeline {
    agent any // Hoặc chỉ định một agent cụ thể nếu cần, ví dụ: agent { label 'node16' }



    tools {
        // Đảm bảo bạn đã cấu hình JDK và NodeJS trong Jenkins Global Tool Configuration
        // Nếu không, bạn có thể cài đặt chúng trong giai đoạn 'Setup Environment'
        // jdk 'AdoptOpenJDK-11' // Ví dụ tên JDK đã cấu hình
        nodejs 'NodeJS-18' // Ví dụ tên NodeJS đã cấu hình
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Đang checkout mã nguồn...'
                // Thay thế bằng lệnh checkout SCM của bạn (ví dụ: git, svn)
                checkout scm
            }
        }

        stage('Setup Environment & Install Dependencies') {
            steps {
                echo 'Đang cài đặt các phụ thuộc của dự án...'
                sh 'npm ci' // Hoặc 'yarn install' nếu bạn dùng Yarn
                // 'npm ci' được khuyến nghị cho CI/CD vì nó cài đặt chính xác các phiên bản trong package-lock.json

                echo 'Đang cài đặt trình duyệt cho Playwright...'
                // Lệnh này sẽ tải xuống các trình duyệt mặc định (Chromium, Firefox, WebKit)
                // Bạn có thể chỉ định trình duyệt cụ thể nếu muốn, ví dụ: 'npx playwright install chromium'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Cucumber Tests') {
            steps {
                echo 'Đang chạy kiểm thử Playwright với Cucumber...'
                // Thay thế 'npm test' bằng lệnh thực tế để chạy kiểm thử của bạn
                // Ví dụ: 'npm run test:cucumber', 'npx cucumber-js'
                // Bạn có thể muốn bọc lệnh này trong try-catch để xử lý lỗi và luôn lưu trữ kết quả
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm test'
                }
            }
        }

       
    }

    post {
        // Các hành động sau khi pipeline hoàn thành (thành công, thất bại, luôn luôn, v.v.)
        always {
            echo 'Pipeline đã hoàn thành.'
            // Dọn dẹp workspace nếu cần
            // cleanWs()
        }
        success {
            echo 'Pipeline thành công!'
            // Gửi thông báo thành công (ví dụ: email, Slack)
        }
        failure {
            echo 'Pipeline thất bại.'
            // Gửi thông báo thất bại
        }
        unstable {
            echo 'Pipeline không ổn định (một số kiểm thử thất bại).'
        }
    }
}
