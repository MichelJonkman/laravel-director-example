<?php

namespace MichelJonkman\DirectorExample\Providers;

use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Support\ServiceProvider;
use MichelJonkman\Director\Director;
use MichelJonkman\Director\Menu\Elements\RootMenuElement;
use MichelJonkman\DirectorExample\MenuExportExampleText;

class MenuServiceProvider extends ServiceProvider
{
    /**
     * @throws BindingResolutionException
     */
    public function boot(Director $director): void
    {
        $director->menu()->modify('director-example', function (RootMenuElement $menu) {
            $menu->addGroup('director-example.group')
                ->setTitle('Example package')
                ->addChildren([
                    $menu->addElement('director-example.group.test', MenuExportExampleText::class)->setText('Example!')
                ]);
        });

        $this->registerCache($director);
    }

    protected function registerCache(Director $director): void
    {
        if ($director->elementsAreCached()) {
            $this->app->booted(function () use ($director) {
                require $director->getCachedElementsPath();
            });
        }
    }
}
