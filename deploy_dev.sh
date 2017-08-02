build_image(){
 docker build -t 80017/circle_test .
}
 
push_image(){
 docker push 80017/circle_test
}

build_image
push_image
