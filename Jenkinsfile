//
pipeline {
    agent any // Hoặc agent { label 'node18' } nếu bạn có agent cụ thể

    tools {
        nodejs 'NodeJS-18' // Đảm bảo 'NodeJS-18' được cấu hình trong Global Tool Configuration
    }

    // environment {
    //     // Sử dụng Jenkins Credentials để lưu trữ thông tin nhạy cảm
    //     TRELLO_EMAIL = credentials('TRELLO_EMAIL')
    //     TRELLO_PASSWORD = credentials('TRELLO_PASSWORD')
    //     TRELLO_WRONG_PASSWORD = credentials('TRELLO_WRONG_PASSWORD')
    //     TRELLO_API_KEY = credentials('TRELLO_API_KEY')
    //     TRELLO_TOKEN = credentials('TRELLO_TOKEN')
    //     TRELLO_CARD_ID = credentials('TRELLO_CARD_ID')
    // }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Đang checkout mã nguồn...'
                checkout scm // Kéo mã từ GitHub repository
            }
        }

        stage('Setup Environment & Install Dependencies') {
            steps {
                echo 'Đang cài đặt các phụ thuộc của dự án...'
                sh 'npm ci'
                echo 'Đang cài đặt trình duyệt cho Playwright...'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Cucumber Tests') {
            steps {
                echo 'Đang chạy kiểm thử Playwright với Cucumber...'
                catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                    sh 'npm test'
                }
            }
        }

        stage('Push Results to Trello') {
            steps {
                echo 'Đang đẩy kết quả kiểm thử lên Trello...'
                sh 'node pushResultsToTrello.js'
            }
        }
    }

    post {
        always {
            echo 'Pipeline đã hoàn thành.'
            archiveArtifacts artifacts: '*.xml, *.json', allowEmptyArchive: true
            // cleanWs() // Dọn dẹp workspace nếu cần
        }
        success {
            echo 'Pipeline thành công!'
        }
        failure {
            echo 'Pipeline thất bại.'
        }
        unstable {
            echo 'Pipeline không ổn định (một số kiểm thử thất bại).'
        }
    }
}
