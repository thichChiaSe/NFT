pipeline {

  options {
    ansiColor('xterm')
  }

  agent none

      environment {
        IMAGE_TAG = "${BUILD_NUMBER}"
        BUILD_VERSION = "0.0.${BUILD_NUMBER}-dev"
        FILE_PATH = 'IRM-fe/base/irm-fe-depl.yaml'
        IMAGE_NAME = 'irm-fe'
    }

  stages {
    stage('Kaniko Build & Push Image') {
      agent {
                kubernetes {
                    yamlFile 'builder.yaml'
                }
            }
      steps {
        container('kaniko') {
          script {
            sh '''
            /kaniko/executor --cache=true \
                             --cache-ttl=48h \
                             --cleanup \
                             --cache-repo=bakcovn/${IMAGE_NAME}-cache \
                             --dockerfile `pwd`/Dockerfile \
                             --context `pwd` \
                             --destination=bakcovn/${IMAGE_NAME}:${BUILD_VERSION}
            '''
          }
        }
      }
    }

    stage('Trigger ArgoCd job') {
            agent any
            steps {
                build job: 'ArgoCD pipeline', parameters: [string(name: 'ProjectName', value: "${IMAGE_NAME}"), string(name: 'FilePath', value: "${FILE_PATH}"), string(name: 'ImageVersion', value: "${BUILD_VERSION}")]
            }
        }
  }
}