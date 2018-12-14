<?php
    class Register extends CI_controller
    {
        public function __construct()
        {
            parent::__construct();
            $this->load->model('register_model');
            $this->load->helper('url');//不同的 class 都要重新 load?
            $this->load->library('session');
            $this->load->helper('form');
        }
        //註冊頁
        public function index()
        {
            $this->load->view('comments/register');
        }
        //處理註冊檢查
        public function Registerhandler()
        {
            $nickname = $this->input->post('nickname');
            $userEmail = $this->input->post('userEmail');
            $password = $this->input->post('password');
            $doublePassword = $this->input->post('doublePassword');
            if($password==$doublePassword){
                $this->register_model->createUser($nickname, $userEmail, $password);
                $this->session->set_userdata(array('user'=>$nickname));//設 session
                redirect('comments');
            }
        }
    }
?>