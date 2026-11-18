pipeline {
  agent any

  environment {
    DOCKERHUB = credentials('dockerhub-credentials')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker build -t $DOCKERHUB_USR/3tier-frontend:$BUILD_NUMBER -t $DOCKERHUB_USR/3tier-frontend:latest ./app/frontend'
        sh 'docker build -t $DOCKERHUB_USR/3tier-backend:$BUILD_NUMBER -t $DOCKERHUB_USR/3tier-backend:latest ./app/backend'
      }
    }

    stage('Push to Docker Hub') {
      steps {
        sh 'echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin'
        sh 'docker push $DOCKERHUB_USR/3tier-frontend --all-tags'
        sh 'docker push $DOCKERHUB_USR/3tier-backend --all-tags'
      }
    }

    stage('Deploy') {
      steps {
        sh 'export DOCKERHUB_USER=$DOCKERHUB_USR && docker compose pull frontend backend && docker compose up -d'
      }
    }
  }

  post {
    always {
      sh 'docker logout'
    }
  }
}
