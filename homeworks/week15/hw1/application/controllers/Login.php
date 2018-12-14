<?php
    class Login extends CI_controller
    {        
        public function __construct()
        {
            parent::__construct();
            $this->load->model('login_model');
            $this->load->helper('url');
            $this->load->library('session');
            $this->load->helper('form');
        }
        public function logout()
        {
            $this->session->unset_userdata('user');
            $this->load->view('comments/login');
        }
        public function index($page='login')
        {
            $this->load->view('comments/'.$page);
            
        }
        public function loginhandler()
        {
            $this->load->library('form_validation');
            $this->form_validation->set_rules('username','Username','required');
            $this->form_validation->set_rules('password','Password','required');
            $user = $this->input->post('username');
            $password = $this->input->post('password');
            echo $this->login_model->findUserByEmail($user);
            if($this->login_model->findUserByEmail($user)){
                if($this->login_model->vertifyUser($user, $password)){
                    $nickname = $this->login_model->vertifyUser($user, $password);
                    $this->session->set_userdata(array('user'=>$nickname));
                    redirect('comments');
                }
            }
            else
            {
                $this->load->view('comments/login');
            }
        }

    }


?>


