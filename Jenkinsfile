```groovy
pipeline {
    agent any

    environment {
        TRELLO_EMAIL = credentials('TRELLO_EMAIL')
        TRELLO_PASSWORD = credentials('TRELLO_PASSWORD')
        TRELLO_WRONG_PASSWORD = credentials('TRELLO_WRONG_PASSWORD')
        TRELLO_API_KEY = credentials('TRELLO_API_KEY')
        TRELLO_TOKEN = credentials('TRELLO_TOKEN')
        TRELLO_CARD_ID = credentials('TRELLO_CARD_ID')
        // Cấu hình Node.js trực tiếp nếu không dùng Global Tool
        PATH = "${env.PATH}:/usr/local/lib/nodejs/node-v18.20.4-linux-x64/bin"
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Đang checkout mã nguồn...'
                checkout scm
            }
        }

        stage('Setup Environment & Install Dependencies') {
            steps {
                echo 'Đang cài đặt Node.js và dependencies...'
                sh '''
                    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
                    apt-get install -y nodejs
                    node -v
                    npm -v
                    npm ci
                    npx playwright install --with-deps
                '''
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
        }
        success {
            echo 'Pipeline thành công!'
        }
        failure {
            echo 'Pipeline thất bại.'
        }
        unstable {
            echo 'Pipeline không ổn định.'
        }
    }
}
```