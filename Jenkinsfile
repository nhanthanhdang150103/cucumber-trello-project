// Jenkinsfile
pipeline {
    agent any
    tools {
        nodejs 'Node18' // Replace with the Node.js version name configured in Jenkins
    }
    environment {
        TRELLO_EMAIL = credentials('TRELLO_EMAIL') // Store in Jenkins credentials
        TRELLO_PASSWORD = credentials('TRELLO_PASSWORD') // Store in Jenkins credentials
        TRELLO_WRONG_PASSWORD = credentials('TRELLO_WRONG_PASSWORD') // Store in Jenkins credentials
        LANGUAGE = 'vi' // Set language for i18n
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-username/your-repo.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Cucumber Tests') {
            steps {
                sh 'npm test -- --tags "@trello"' // Run tests with @trello tag
            }
        }
        stage('Generate Cucumber Report') {
            steps {
                cucumber fileIncludePattern: '**/*.json',
                         fileExcludePattern: '',
                         jsonReportDirectory: 'cucumber-report',
                         sortingMethod: 'ALPHABETICAL'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cucumber-report/*.json', allowEmptyArchive: true
            // Optional: Slack notification
            slackSend channel: '#your-channel', message: "Build ${env.BUILD_NUMBER} finished: ${currentBuild.currentResult}"
        }
        failure {
            slackSend channel: '#your-channel', color: 'danger', message: "Build ${env.BUILD_NUMBER} failed!"
        }
        success {
            slackSend channel: '#your-channel', color: 'good', message: "Build ${env.BUILD_NUMBER} succeeded!"
        }
    }
}