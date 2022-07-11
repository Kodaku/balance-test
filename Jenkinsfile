def img
pipeline {
    environment {
        registry = "axelmastroianni/balance-test"
        registryCredential = "docker-hub-login"
        dockerImage = ''
    }
    agent any

    stages {
        stage("Build image") {
            steps {
                script {
                    img = registry + ":${env.BUILD_ID}"
                    println("${img}")
                    dockerImage = docker.build("${img}")
                }
            }
        }

        stage("Testing - running in Jenkins node") {
            steps {
                powershell "docker run --network='host' --name balance-test ${img}"
            }
        }

        stage("Stopping running container") {
            steps {
                powershell "docker stop balance-test"
            }
        }

        stage("Removing the container") {
            steps {
                powershell "docker rm balance-test"
            }
        }

        stage("Push to DockerHub") {
            steps {
                script {
                    docker.withRegistry("https://registry.hub.docker.com", registryCredential) {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}