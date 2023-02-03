<?php

namespace MichelJonkman\DirectorExample\Providers;

use MichelJonkman\Director\Director;
use MichelJonkman\Director\Providers\ServiceProvider;

class FrontendServiceProvider extends ServiceProvider
{
    public function boot(Director $director)
    {
        if ($this->app->runningInConsole()) {
            $director->publicPublish(__DIR__ . '/../../build/director/example', 'example');
        }
    }
}
