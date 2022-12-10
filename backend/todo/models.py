from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=100, default='')
    done = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.title

