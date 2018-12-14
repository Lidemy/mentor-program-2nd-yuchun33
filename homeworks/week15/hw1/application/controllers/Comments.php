<?php
    class Comments extends CI_controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('comments_model');
            $this->load->helper('url');
            $this->load->library('session');
            $this->load->helper('form');
        }
        public function index()
        {
            $data['user'] = $this->session->userdata('user');
            $data['comments'] = $this->comments_model->getcomments();
            $this->load->view('comments/comment', $data);
                $this->load->view('comments/ajax');
        }
        public function createcomment()
        {
            $timestamp = date('m-d H:i:s',strtotime("now"));
            $nickname = $this->input->post('nickname');
            $content = $this->input->post('content');
            $parent = $this->input->post('parent');
            $this->comments_model->insertComment($nickname, $content, $parent, $timestamp);
            $lastID = $this->comments_model->getLastID();
            //$this->load->view('comments/create');
            header("Content-Type: application/json");//!
            $res = ['id'=> $lastID, 'timestamp'=>$timestamp];
            echo json_encode($res);
        }
        public function deleteComment()
        {
            $deleteId = $this->input->post('deleteId');
            echo $deleteId;
            $this->comments_model->deleteComment($deleteId);
        }
        public function updateComment()
        {
            $timestamp = date('m-d H:i:s',strtotime("now"));
            $updateId = $this->input->post('updateId');
            $updateComment = $this->input->post('updateComment');
            echo $updateId, $updateComment;
            $this->comments_model->updateComment($updateId, $updateComment, $timestamp);
        }
    }

?>