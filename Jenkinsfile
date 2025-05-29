```groovy
pipeline {
    agent any
    tools {
        nodejs 'Node18' // Ensure this matches the Node.js version name in Jenkins Global Tool Configuration
    }
    environment {
        TRELLO_EMAIL = credentials('TRELLO_EMAIL') // Jenkins credential ID
        TRELLO_PASSWORD = credentials('TRELLO_PASSWORD') // Jenkins credential ID
        TRELLO_WRONG_PASSWORD = credentials('TRELLO_WRONG_PASSWORD') // Jenkins credential ID
        LANGUAGE = 'vi' // Set language for i18n
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
        stage('Create Report Directory') {
            steps {
                sh 'mkdir -p cucumber-report'
                echo 'Created cucumber-report directory'
            }
        }
        stage('Run Cucumber Tests') {
            steps {
                sh 'npm test -- --tags "@trello"'
                echo 'Ran Cucumber tests with @trello tag'
            }
        }
        stage('Generate Cucumber Report') {
            steps {
                cucumber fileIncludePattern: '**/*.json',
                        jsonReportDirectory: 'cucumber-report',
                        sortingMethod: 'ALPHABETICAL',
                        failedFeaturesNumber: 0,
                        failedScenariosNumber: 0,
                        undefinedStepsNumber: 0
                echo 'Generated Cucumber report'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cucumber-report/*.json', allowEmptyArchive: true
            echo 'Archived Cucumber report artifacts'
        }
        // Optional: Uncomment if Slack plugin is configured
        // failure {
        //     slackSend channel: '#your-channel', color: 'danger', message: "Build ${env.BUILD_NUMBER} failed!"
        // }
        // success {
        //     slackSend channel: '#your-channel', color: 'good', message: "Build ${env.BUILD_NUMBER} succeeded!"
        // }
    }
}
```