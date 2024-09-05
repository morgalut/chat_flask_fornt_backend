import json
import subprocess
import threading
import time
from enum import Enum

import requests


class HealthStatus(Enum):
    """Enum representing different health statuses."""
    HEALTHY = 'healthy'
    UNHEALTHY = 'unhealthy'
    ERROR = 'error'


class NodeJsHealthChecker:
    """A class to check the health of a Node.js server and notify it of the Python server's status."""

    def __init__(self, notify_url, check_interval, node_server_command):
        """
        Initialize the NodeJsHealthChecker with the given parameters.

        :param notify_url: URL to notify the Node.js server.
        :param check_interval: Interval between health checks in seconds.
        :param node_server_command: Command to start the Node.js server.
        """
        self.notify_url = notify_url
        self.check_interval = check_interval
        self.node_server_command = node_server_command

    def notify_alive(self):
        """Notify the Node.js server that the Python server is alive."""
        while True:
            try:
                payload = json.dumps({'message': 'I am alive'})
                headers = {'Content-Type': 'application/json'}
                response = requests.post(self.notify_url, data=payload, headers=headers, timeout=10)
                if response.status_code == 200:
                    print('Notified Node.js server that Python server is alive.')
                else:
                    print(f'Failed to notify Node.js server: {response.status_code} - {response.text}')
            except requests.RequestException as e:
                print(f'Error notifying Node.js server: {e}')
                self.send_dead_message()
                self.start_node_server()
            time.sleep(self.check_interval)

    def send_dead_message(self):
        """Notify the Node.js server that the Python server is dead."""
        try:
            payload = json.dumps({'message': "I'm dead, continue, who's here"})
            headers = {'Content-Type': 'application/json'}
            response = requests.post(self.notify_url, data=payload, headers=headers, timeout=10)
            if response.status_code == 200:
                print('Notified Node.js server that Python server is dead.')
            else:
                print(f'Failed to notify Node.js server: {response.status_code} - {response.text}')
        except requests.RequestException as e:
            print(f'Error notifying Node.js server of shutdown: {e}')

    def start_node_server(self):
        """Start the Node.js server using the provided command."""
        try:
            print("Starting Node.js server...")
            subprocess.Popen(self.node_server_command, shell=True)
        except Exception as e:
            print(f"Failed to start Node.js server: {e}")

    def start(self):
        """Start the health checker thread to monitor the server status."""
        notify_thread = threading.Thread(target=self.notify_alive, daemon=True)
        notify_thread.start()
