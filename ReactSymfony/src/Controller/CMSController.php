<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CMSController extends AbstractController
{
    #[Route('/', name: 'app')]
    public function index(): Response
    {
        return $this->render('cms/root.html.twig', [
            'controller_name' => 'app',
        ]);
    }

    #[Route('/home', name: 'app_home')]
    public function home(): Response
    {
        return $this->render('cms/home.html.twig', [
            'controller_name' => 'app_home',
        ]);
    }

    #[Route('/article', name: 'app_article')]
    public function build(): Response
    {
        return $this->render('cms/article.html.twig', [
            'controller_name' => 'app_article',
        ]);
    }

    #[Route('/registration', name: 'app_registration')]
    public function Registration(): Response
    {
        return $this->render('cms/registration.html.twig', [
            'controller_name' => 'app_registration',
        ]);
    }
}
