pipeline {
    agent any
    tools {
        nodejs 'Node18' // Đảm bảo tên này trùng với cấu hình trong Jenkins
    }
    environment {
        TRELLO_EMAIL = credentials('TRELLO_EMAIL')
        TRELLO_PASSWORD = credentials('TRELLO_PASSWORD')
        TRELLO_WRONG_PASSWORD = credentials('TRELLO_WRONG_PASSWORD')
        LANGUAGE = 'vi'
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/nhanthanhdang150103/cucumber-trello-project.git', branch: 'main'
                echo 'Checked out code from GitHub'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
                echo 'Installed Node.js dependencies'
            }
        }
        stage('Run Cucumber Tests') {
            steps {
                // Đảm bảo cấu hình Cucumber xuất JSON vào thư mục này
                sh 'npm test -- --tags "@trello"'
                echo 'Ran Cucumber tests with @trello tag'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cucumber-report/*.json', allowEmptyArchive: true
            echo 'Archived Cucumber report artifacts'
        }
    }
}
