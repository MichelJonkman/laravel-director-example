<?php

namespace MichelJonkman\DirectorExample\Providers;

use Illuminate\Support\ServiceProvider;
use MichelJonkman\Director\Director;

class FrontendServiceProvider extends ServiceProvider
{
    public function boot(Director $director)
    {
        if ($this->app->runningInConsole()) {
            $director->publicPublish(__DIR__ . '/../../build/director/director', 'director');
        }
    }
}
