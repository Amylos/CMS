<?php

namespace App\Controller;

use App\Entity\DataCSV;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

#[AsController]
final class CreateDataCSVController extends AbstractController
{
    public function __invoke(Request $request): DataCSV
    {
        $uploadedFile = $request->files->get('file');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"file" is required');
        }

        $mediaObject = new DataCSV();
        $mediaObject->file = $uploadedFile;

        return $mediaObject;
    }
}