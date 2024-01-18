<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DataCSVRepository;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\OpenApi\Model;
use App\Controller\CreateDataCSVController;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: DataCSVRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['dataCSV:read']],
    types: ['https://schema.org/MediaObject'],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(
            controller: CreateDataCSVController::class,
            deserialize: false,
            validationContext: ['groups' => ['Default', 'dataCSV_create']],
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object',
                                'properties' => [
                                    'file' => [
                                        'type' => 'string',
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            )
        )
    ]
)]
class DataCSV
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['dataCSV:read'])]
    public ?string $contentUrl = null;

    #[Vich\UploadableField(mapping: "dataCSV", fileNameProperty: "filePath")]
    #[Assert\NotNull(groups: ['dataCSV_create'])]
    #[Groups(['dataCSV:read'])]
    public ?File $file = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['dataCSV:read'])]
    public ?string $filePath = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['dataCSV:read'])]
    public ?string $blocID = null;


    public function getBlocID(): ?string
    {
        return $this->blocID;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function getId(): ?int
    {
        return $this->id;
    }
}
