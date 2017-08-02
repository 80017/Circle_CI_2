node
{
  def app

  stage('Clone repository')
  {
    node
    {
      try
      {
        checkout scm
        currentBuild.result = 'SUCCESS'
      }
      catch(any)
      {
         currentBuild.result = 'FAILURE'
         throw any
      }
      finally
      {
          step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: '$my_email_id', sendToIndividuals: true])
      }
    }
   }

  stage('Build image for autobidding-server')
  {
    node
       {
         try
         {
           app = docker.build("$user_id/autobidding-server","./biddingBackend/")
           currentBuild.result = 'SUCCESS'
         }
         catch(any)
         {
           currentBuild.result = 'FAILURE'
           throw any
         }
         finally
         {
           step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: '$my_email_id', sendToIndividuals: true])
         }
       }
   }

   stage('Push image for autobidding-server')
   {
    node
       {
         try
         {
            docker.withRegistry('https://registry.hub.docker.com', 'flows_account')
            {
             app.push("${env.BUILD_NUMBER}")
             app.push("latest")
            }
            currentBuild.result = 'SUCCESS'
         }
         catch(any)
         {
           currentBuild.result = 'FAILURE'
           throw any
         }
         finally
         {
           step([$class: 'Mailer', notifyEveryUnstableBuild: true, recipients: '$my_email_id', sendToIndividuals: true])
         }
       }
    }
}
