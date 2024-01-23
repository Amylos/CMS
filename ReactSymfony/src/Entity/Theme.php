<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ThemeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ThemeRepository::class)]
#[ApiResource]
class Theme
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?int $article_id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $backgroundColor = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $textColor = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fontFamily = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fontSize = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $fontWeight = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArticleId(): ?int
    {
        return $this->article_id;
    }

    public function setArticleId(?int $article_id): static
    {
        $this->article_id = $article_id;

        return $this;
    }

    public function getBackgroundColor(): ?string
    {
        return $this->backgroundColor;
    }

    public function setBackgroundColor(?string $backgroundColor): static
    {
        $this->backgroundColor = $backgroundColor;

        return $this;
    }

    public function getTextColor(): ?string
    {
        return $this->textColor;
    }

    public function setTextColor(?string $textColor): static
    {
        $this->textColor = $textColor;

        return $this;
    }

    public function getFontFamily(): ?string
    {
        return $this->fontFamily;
    }

    public function setFontFamily(?string $fontFamily): static
    {
        $this->fontFamily = $fontFamily;

        return $this;
    }

    public function getFontSize(): ?string
    {
        return $this->fontSize;
    }

    public function setFontSize(?string $fontSize): static
    {
        $this->fontSize = $fontSize;

        return $this;
    }

    public function getFontWeight(): ?string
    {
        return $this->fontWeight;
    }

    public function setFontWeight(?string $fontWeight): static
    {
        $this->fontWeight = $fontWeight;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
