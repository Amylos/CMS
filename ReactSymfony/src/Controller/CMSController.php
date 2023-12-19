<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\UserRepository;

class CMSController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    #[Route('/', name: 'app')]
    public function index(): Response
    {
        return $this->render('cms/root.html.twig', [
            'controller_route' => 'app',
        ]);
    }

    #[Route('/home', name: 'app_home')]
    public function home(): Response
    {


        $users = $this->userRepository->findAllUsers();

        // Convertir la ArrayCollection en un tableau associatif
        // $usersArray = [];
        // foreach ($users as $user) {
        //     $usersArray[] = [
        //         'id' => $user->getId(),
        //         'username' => $user->getUsername(),
        //         'firstName' => $user->getFirstName(),
        //         'lastName' => $user->getLastName(),
        //         'mail' => $user->getMail(),
        //         'roles' => $user->getRoles(),
        //     ];
        // }
        // $jsonUsers = json_encode($usersArray);

        return $this->render('cms/home.html.twig', [
            'controller_route' => 'app_home',
            'users' =>  $users
        ]);
    }

    #[Route('/article', name: 'app_article')]
    public function build(): Response
    {
        $users = $this->userRepository->findAllUsers();

        return $this->render('cms/article.html.twig', [
            'controller_route' => 'app_article',
        ]);
    }


}
